import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
dotenv.config({ path: __dirname + '/.env' });

const APIKEY = process.env.OPEN_AI_API_KEY;

const configuration = new Configuration({
    apiKey: APIKEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

    const { prompt, imageSize } = req.body;
    console.log(imageSize);

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize == 'small' ? '256x256' : imageSize == 'medium' ? '512x512' : '1024x1024',
        });
        let imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl
        }
        );
    } catch (error) {
        res.status(400).json({
            success: false,
            data: 'Image couldn\'t be generated!'
        }
        );
        console.log(error);
    }
}

export default generateImage