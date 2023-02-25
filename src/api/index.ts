import axios from "axios";
import { API_KEY } from "src/constants";
import { workerData } from "worker_threads";

export class Api {
    static async getWords() {
        // return ['hola', 'chau']
        const r = await axios.post('https://api.openai.com/v1/completions',{"model": "text-davinci-003", "prompt": "Give me two words (they can be nouns, actions, activities) separated by a comma that are semantically similar but not synonyms. Just give me the 2 words without any other text surrounding it.", "temperature": 0.9, "max_tokens": 7},{
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        })
        return r.data.choices[0].text.split(',').map((word:string) => word.trim())
    }
}