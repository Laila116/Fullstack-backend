import mongoose, { Schema, Model } from 'mongoose';
import { IFeedback } from "@shared/interface/iFeedback";


const FeedbackSchema: Schema<IFeedback> = new Schema(
    {
        eventID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event' },
        userEmail: { type: String, required: true },
        feedback: {
            type: Number,
            required: true,
            min: 1.0,
            max: 5.0,
            validate: {
                validator: (value: number) => {
                    
                    return Number.isInteger(value * 10);
                },
                message: (props: { value: number; path: string }) =>
                    '${props.value} ist kein gültiger Feedback-Wert. Erlaubte Werte sind in 0.1-Schritten zwischen 1.0 und 5.0.',
            },
        },
        comment: { type: String, required: false },
    },
    {
        timestamps:  {createdAt: true, updatedAt: false },
        versionKey: false 
    }
);

const Feedback: Model<IFeedback> = mongoose.model<IFeedback>('feedback', FeedbackSchema);

export default Feedback;
