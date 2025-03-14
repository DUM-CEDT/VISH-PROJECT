const YanTemplate = require('../models/YanTemplate');

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

