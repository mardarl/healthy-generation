import mongoose from 'mongoose'

const MeasurementTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
    },
    { timestamps: true }
)

const MeasurementType = mongoose.model('MeasurementType', MeasurementTypeSchema)
export default MeasurementType
