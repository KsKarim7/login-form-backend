import mongoose from "mongoose";

export const ConnectDB = async (USERNAME, PASSWORD) => {
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@login-form.6fdzl01.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('DB Connected')
    }
    catch (error) {
        console.log('Error while connecting with the database', error.message);
    }
}
export default ConnectDB;