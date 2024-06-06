document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const squares = document.querySelectorAll('.square');

    //custom defines
    let img = new Image();
    let secondImg = new Image();
    secondImg.src = 'meme.png';
    let currentText = 'type your text here...';
    let userImg = new Image();
    let userImgLoaded = false;



    //canvas logo display
    const logoPositions = {
        logo1: { x: 730, y: 130, width: 344.4, height: 107.5 },
        logo2: { x: 730, y: 130, width: 344.4, height: 107.5 }
    };

    let currentBackgroundColor = getComputedStyle(squares[0]).backgroundColor;
    let currentLogoUrl = 'logo.png';

    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set background color
        ctx.fillStyle = currentBackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the logo image
        ctx.font = '65px graphik';
        img.src = currentLogoUrl;
        img.onload = () => {
            const pos = (currentLogoUrl === 'logo.png') ? logoPositions.logo1 : logoPositions.logo2;
            ctx.drawImage(img, pos.x, pos.y, pos.width, pos.height);

            // Draw the user image (cat.jpeg or uploaded image)
            if (userImgLoaded) {
                drawUserImage();
            } else {
                drawPlaceholderImage();
            }
        };
    }




//text
document.addEventListener('DOMContentLoaded', function() {
    const userText = document.getElementById('userText');
    const charCount = document.getElementById('charCount');

    // 监听用户输入并实时更新字符数量
    userText.addEventListener('input', function() {
        const text = userText.value;
        const count = text.length;
        charCount.textContent = `Characters: ${count}`;
    });

    // 自动伸缩用户输入文本框的大小
    userText.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});

function drawText(yPosition) {
    const textColor = (currentLogoUrl === 'logo.png') ? getComputedStyle(document.getElementById('picnic')).backgroundColor : getComputedStyle(document.getElementById('morning')).backgroundColor;
    ctx.fillStyle = textColor;
    ctx.font = '65px Graphik';
    ctx.textAlign = 'center';
    const maxWidth = 1450;
    ctx.letterSpacing = '-1.1%';
    const lines = getLines(ctx, currentText, maxWidth);
    const lineHeight = calculateLineHeight(currentText.length);
    const x = canvas.width / 2;

    yPosition = canvas.height - calculateBottomMargin(currentText.length) - (lines.length - 1) * lineHeight;

    lines.forEach((line, index) => {
        ctx.fillText(line, x, yPosition + (index * lineHeight));
    });
}

function getLines(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function calculateImageHeight(textLength) {
    if (textLength <= 44) {
        return 1040;
    } else if (textLength <= 89) {
        return 950;
    } else {
        return 900;
    }
}

    //meme pic
    function drawPlaceholderImage() {
        const userImgWidth = document.getElementById('widthSlider').value;
        const userImgHeight = calculateImageHeight(currentText.length); // 使用 calculateImageHeight 获取图片高度
        const userImgX = (canvas.width - userImgWidth) / 2;
        const userImgY = 375;
    
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(userImgX, userImgY, userImgWidth, userImgHeight, [80]);
        ctx.clip();
    
        // 确保图片加载成功后再进行绘制
        if (secondImg.complete && secondImg.naturalHeight !== 0) {
            const aspectRatio = secondImg.naturalWidth / secondImg.naturalHeight;
            let drawHeight = userImgHeight;
            let drawWidth = drawHeight * aspectRatio; // 按比例调整宽度
    
            // 如果绘制宽度小于裁剪宽度，才进行放大处理
            if (drawWidth < userImgWidth) {
                drawWidth = userImgWidth;
                drawHeight = drawWidth / aspectRatio; // 重新计算高度
            }
    
            const drawX = userImgX + (userImgWidth - drawWidth) / 2; // 居中绘制
            const drawY = userImgY;
    
            ctx.drawImage(secondImg, drawX, drawY, drawWidth, drawHeight);
        }
    
        ctx.restore();
        drawText(userImgY + userImgHeight); // Draw text
    }    


    function drawUserImage() {
        const userImgWidth = document.getElementById('widthSlider').value;
        const userImgHeight = calculateImageHeight(currentText.length); // 使用 calculateImageHeight 获取图片高度
        const userImgX = (canvas.width - userImgWidth) / 2;
        const userImgY = 375;
    
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(userImgX, userImgY, userImgWidth, userImgHeight, [80]);
        ctx.clip();
    
        // 确保图片加载成功后再进行绘制
        if (userImgLoaded) {
            const aspectRatio = userImg.naturalWidth / userImg.naturalHeight;
            let drawHeight = userImgHeight;
            let drawWidth = drawHeight * aspectRatio; // 按比例调整宽度
    
            // 如果绘制宽度小于裁剪宽度，才进行放大处理
            if (drawWidth < userImgWidth) {
                drawWidth = userImgWidth;
                drawHeight = drawWidth / aspectRatio; // 重新计算高度
            }
    
            const drawX = userImgX + (userImgWidth - drawWidth) / 2; // 居中绘制
            const drawY = userImgY;
    
            ctx.drawImage(userImg, drawX, drawY, drawWidth, drawHeight);
        }
    
        ctx.restore();
        drawText(userImgY + userImgHeight); // Draw text
    }    




function calculateBottomMargin(textLength) {
    if (textLength <= 44) {
        return 170;
    } else if (textLength <= 89) {
        return 165;
    } else {
        return 155;
    }
}

function calculateTextHeight(textLength) {
    const lines = Math.ceil(textLength / 44);
    if (lines === 1) {
        return 65 * 1.3;
    } else if (lines === 2) {
        return 65 * 1.4 * 2;
    } else {
        return 65 * 1.3 * 3;
    }
}

function calculateLineHeight(textLength) {
    if (textLength <= 44) {
        return 65 * 1.3;
    } else if (textLength <= 89) {
        return 65 * 1.4;
    } else {
        return 65 * 1.3;
    }
}

drawCanvas();

squares.forEach(square => {
    square.addEventListener('click', () => {
        currentBackgroundColor = getComputedStyle(square).backgroundColor;
        const id = square.id;
        currentLogoUrl = (id === 'picnic' || id === 'purple') ? 'logo2.png' : 'logo.png';
        drawCanvas();
    });
});

document.getElementById('upload').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            userImg = new Image();
            userImg.onload = () => {
                userImgLoaded = true;
                document.getElementById('widthSlider').value = userImg.width; // Set slider to image width
                drawCanvas();
            };
            userImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
    input.click();
});

document.getElementById('download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'canvas.png';
    link.click();
});

document.getElementById('userText').addEventListener('input', (e) => {
    currentText = e.target.value;
    drawCanvas();
});

document.getElementById('widthSlider').addEventListener('input', () => {
    drawCanvas();
});

});
