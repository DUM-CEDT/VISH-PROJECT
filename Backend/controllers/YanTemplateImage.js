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
// @route   GET /api/yan/image/:page
// @access  Public
exports.getYanImages = async (req, res, next) => {
    try {
        const page = req.params.page || 1
        const category = req.query.category
        const level = req.query.level
        const sort = req.query.sort
        const setid = req.query.setid 
        const ascending = req.query.asc
        const limit = 10
        const skip = (page - 1) * limit

        if(!ascending){
            sort = '-' + sort
        }

        const yanImages = await YanTemplateImage.find({
            yan_category: category,
            yan_level: level,
            yan_template_image_set_id: setid
        }).sort(sort).limit(limit).skip(skip)

        res.status(200).json({
            success: true,
            msg: 'get yan images successfully',
            data: yanImages
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}
