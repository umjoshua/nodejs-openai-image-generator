const onSubmit = (e) => {
    e.preventDefault();
    const prompt = document.querySelector('#text').value;
    const imageSize = document.querySelector('#size').value;

    generateImage(prompt, imageSize);
}

const generateImage = async (prompt, imageSize) => {
    document.querySelector('#warning').style.display = "none"
    try {
        const response = await fetch('/openai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                imageSize
            })
        });

        const data = await response.json();
        if(data.success==false){
            document.querySelector('#warning').style.display = "contents";
            return;
        }
        console.log(data);
        const imageData = data.data;
        console.log(imageData);
        document.querySelector('#generatedImage').src = imageData;

        document.querySelector('#image').style.display = "contents"
    } catch (error) {
        document.querySelector('#warning').style.display = "contents"
    }
}

document.querySelector('#input-form').addEventListener('submit', onSubmit);