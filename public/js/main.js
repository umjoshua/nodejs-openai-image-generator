const onSubmit = (e) => {
    e.preventDefault();
    const prompt = document.querySelector('#text').value;
    const imageSize = document.querySelector('#size').value;

    generateImage(prompt, imageSize);
}

const handleFailure = () => {
    document.querySelector('#warning').style.display = "contents";
    document.querySelector('#lds-ring').style.display = "none";
}

const generateImage = async (prompt, imageSize) => {

    document.querySelector('#warning').style.display = "none";
    document.querySelector('#image').style.display = "none";
    document.querySelector('#lds-ring').style.display = "inline-block";
    document.querySelector('#generatedImage').src = "";

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
        if (data.success == false) {
            handleFailure;
            return;
        }
        const imageData = data.data;
        console.log(imageData);

        document.querySelector('#generatedImage').src = imageData;
        document.querySelector('#lds-ring').style.display = "none";
        document.querySelector('#image').style.display = "contents";
    } catch (error) {
        handleFailure;
    }
}

document.querySelector('#input-form').addEventListener('submit', onSubmit);