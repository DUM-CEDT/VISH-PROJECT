const YanTemplate = require('../models/YanTemplate');
const YanTemplateImage = require('../models/YanTemplateImage');
const YanExport = require('../models/YanExport');
const User = require('../models/User');
const sharp = require('sharp');

const hexToRgba = (hex, alpha = 1) => {
    hex = hex.replace(/^#/, ''); // Remove #
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join(''); // Convert short hex (e.g., #FFF) to full (e.g., #FFFFFF)
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b, alpha };
};

// @desc    Create a new YanTemplate
// @route   POST /api/yan/template
// @access  Public
exports.createYanTemplate = async (req, res, next) => {
    try {
        const { image, category, background } = req.body

        const yanTemplate = new YanTemplate({
            yan_category: category,
            yan_template_image_list: image,
            background_color: background,
            export_count: 0
        })

        const existedYanTemplate = await YanTemplate.exists({ yan_template_image_list: image, background_color: background });
        if (existedYanTemplate) {
            return res.status(200).json({
                success: true,
                msg: 'Yan Template already exists',
                data: existedYanTemplate
            })
        }

        const createdYanTemplate = await yanTemplate.save()

        res.status(201).json({
            success: true,
            msg: 'create yan template successfully',
            data: createdYanTemplate
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
};

// @desc    Get all YanTemplates
// @route   GET /api/yan/template
// @access  Public
exports.getYanTemplates = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const { category, sort, asc , color } = req.query;
        const limit = 10;
        const skip = (page - 1) * limit;

        let query = {};
        if (category) query.yan_category = category;

        if (color) query.background_color = color;

        let sortOption = {};
        if (sort) {
            sortOption[sort] = asc === "true" ? 1 : -1;
        }

        const totalDocuments = await YanTemplate.countDocuments(query);
        const maxPage = Math.ceil(totalDocuments / limit);

        const yanTemplate = await YanTemplate.find(query)
            .sort(sortOption)
            .limit(limit)
            .skip(skip);

        res.status(200).json({
            success: true,
            count: yanTemplate.length,
            lastpage : maxPage,
            data: yanTemplate,
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
};

// @desc    Get a YanTemplate
// @route   GET /api/yan/template/:id
// @access  Public
exports.getYanTemplate = async (req, res, next) => {
    try {
        const yanTemplate = await YanTemplate.findById(req.params.id);  

        if (!yanTemplate) {
            return res.status(404).json({
                success: false,
                msg: 'Yan Template not found'
            })
        }

        res.status(200).json({
            success: true,
            data: yanTemplate,
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

// @desc    Delete a YanTemplate
// @route   DELETE /api/yan/template/:id
// @access  Admin
exports.deleteYanTemplate = async (req, res, next) => {
    try {
        const yanTemplate = await YanTemplate.findById(req.params.id);

        if (!yanTemplate) {
            return res.status(404).json({
                success: false,
                msg: 'Yan Template not found'
            })
        }
        
        await yanTemplate.deleteOne()

        res.status(200).json({
            success: true,
            msg: 'Yan Template deleted successfully',
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

// @desc    Download a YanTemplate
// @route   GET /api/yan/template/download/:id
// @access  Public
exports.downloadYanTemplate = async (req, res, next) => {
    try {
        const yanTemplate = await YanTemplate.findById(req.params.id);

        if (!yanTemplate) {
            return res.status(404).json({
                success: false,
                msg: 'Yan Template not found'
            })
        }

        const yanImages = await Promise.all(
            yanTemplate.yan_template_image_list.map(async (imageId) => {
                const yanImage = await YanTemplateImage.findById(imageId);
                if (!yanImage) throw new Error('Yan Image not found');
                return Buffer.from(yanImage.yan_image_base64, 'base64');
            })
        );

        if (yanImages.length === 0) {
            return res.status(404).json({
                success: false,
                msg: 'No images found for this template'
            });
        }

        const bgColorHex = yanTemplate.background_color || "#FFFFFF";
        const backgroundColor = hexToRgba(bgColorHex);

        const width = 290; 
        const height = 430; 

        const background = await sharp({
            create: {
                width,
                height,
                channels: 4,
                background: backgroundColor
            }
        })
        .png()
        .toBuffer();

        const layeredImage = await sharp(background)
            .composite(
                yanImages.map(imageBuffer => ({ input: imageBuffer, blend: 'over' }))
            )
            .png()
            .toBuffer();

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="yan-template.png"`);

        res.send(layeredImage);

        const userId = req.user._id;
        const yanExport = await YanExport.findOne({ yan_template_id: req.params.id });
        if (yanExport) {
            if (!yanExport.user_id.includes(userId)) {
                yanExport.user_id.push(userId);
                await yanExport.save();
                yanTemplate.export_count += 1;
                await yanTemplate.save();
            }
        } else {
            await YanExport.create({
                yan_template_id: req.params.id,
                user_id: [userId]
            });
            yanTemplate.export_count += 1;
            await yanTemplate.save();
        }
    }catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message,
        })
    }
}
