const YanTemplateImage = require('../models/YanTemplateImage');

// @desc    Create a new YanTemplateImage
// @route   POST /api/yan/image
// @access  Admin
exports.createYanImage = async (req, res, next) => {
    try {
        const { category, level, image , setid } = req.body

        const yanImage = new YanTemplateImage({
            yan_category: category,
            yan_level: level,
            yan_image_base64: image,
            yan_template_image_set_id: setid
        })

        const createdYanImage = await yanImage.save()

        res.status(201).json({
            success: true,
            msg: 'create yan image successfully',
            data: createdYanImage
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
};

// @desc    Update a YanTemplateImage
// @route   PUT /api/yan/image/:id
// @access  Admin
exports.updateYanImage = async (req, res, next) => {
    try {
        const { category, level, image , setid } = req.body

        const yanImage = await YanTemplateImage.findById(req.params.id)

        if (!yanImage) {
            return res.status(404).json({
                success: false,
                msg: 'Yan Image not found'
            })
        }

        if(category){
            yanImage.yan_category = category
        }
        
        if(level){
            yanImage.yan_level = level
        }

        if(image){
            yanImage.yan_image_base64 = image
        }

        if(setid){
            yanImage.yan_template_image_set_id = setid
        }

        const updatedYanImage = await yanImage.save()

        res.status(200).json({
            success: true,
            msg: 'update yan image successfully',
            data: updatedYanImage
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
};

// @desc    Get all YanTemplateImage
// @route   GET /api/yan/image
// @access  Public
exports.getYanImages = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const { category, level, setid, sort, asc } = req.query;
        const limit = 10;
        const skip = (page - 1) * limit;

        let query = {};
        if (category) query.yan_category = category;
        if (level) query.yan_level = level;
        if (setid) query.yan_template_image_set_id = setid;

        let sortOption = {};
        if (sort) {
            sortOption[sort] = asc === "true" ? 1 : -1;
        }

        const totalDocuments = await YanTemplateImage.countDocuments(query);
        const maxPage = Math.ceil(totalDocuments / limit);

        const yanImages = await YanTemplateImage.find(query)
            .sort(sortOption)
            .limit(limit)
            .skip(skip);

        res.status(200).json({
            success: true,
            msg: 'Fetched Yan images successfully',
            count: yanImages.length,
            lastpage : maxPage,
            data: yanImages
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};

// @desc    Get a single YanTemplateImage
// @route   GET /api/yan/image/:id
// @access  Public
exports.getYanImage = async (req, res, next) => {
    try {
        const yanImage = await YanTemplateImage.findById(req.params.id)

        if (!yanImage) {
            return res.status(404).json({
                success: false,
                msg: 'Yan Image not found'
            })
        }

        res.status(200).json({
            success: true,
            msg: 'Fetched Yan image successfully',
            data: yanImage
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
};

// @desc    Delete a YanTemplateImage
// @route   DELETE /api/yan/image/:id
// @access  Admin
exports.deleteYanImage = async (req, res, next) => {
    try {
        const yanImage = await YanTemplateImage.findById(req.params.id)

        if (!yanImage) {
            return res.status(404).json({
                success: false,
                msg: 'Yan Image not found'
            })
        }

        await yanImage.deleteOne()

        res.status(200).json({
            success: true,
            msg: 'Yan Image deleted successfully'
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}