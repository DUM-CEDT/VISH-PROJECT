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