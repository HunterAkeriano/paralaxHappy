"use strict"

window.addEventListener("load", windowLoad);

function windowLoad(){
    document.documentElement.classList.add("loaded");

    // mouse paralaxx

    const page = document.querySelector('.page');
    const paralaxxItems = document.querySelectorAll('[class*="__inset"]');
    const speed = 0.05;

    let posX = 0;
    let cXprocent = 0;

    page.addEventListener('mousemove', parallaxAnimation);
    function parallaxAnimation(e){
        const paralaxWidth = window.innerWidth;
        const cX = e.pageX - paralaxWidth / 2;
        cXprocent = cX / paralaxWidth * 100;
        } 
        function setParallaxAnimationStyle(e){
            const distX = cXprocent - posX;
            posX = posX + (distX * speed);
            paralaxxItems.forEach(paralaxxItem =>{
                const value = paralaxxItem.dataset.prxValue ?
                +paralaxxItem.dataset.prxValue : 1;
                
                paralaxxItem.style.cssText = `
                    transform: translateX(${posX/value}%);
                `
            });
            requestAnimationFrame(setParallaxAnimationStyle);
        }
        setParallaxAnimationStyle();

        // scrollParallax

        const moon = document.querySelector('.moon');
        const building = document.querySelectorAll('.building');
        const tree = document.querySelector('.tree');
        const stairs = document.querySelector('.stairs');
        const train = document.querySelector('.train');
        const santaItems = document.querySelectorAll('.santa>*');


        window.addEventListener('scroll', createPosition);
        createPosition();

        function createPosition(){
            const contentElement = document.querySelector('.content__container');
            const windowHeight = window.innerHeight;
            const finalPos = scrollY / (contentElement.offsetTop - windowHeight) * 100;
            finalPos < 100 ? christmasAnimation(finalPos) :  christmasAnimation(100);

        }
        function christmasAnimation(finalPos){
            const moonAnim = {
                translate: 50 / 100 * finalPos,
                scale: 1 + 2/100 * finalPos
            }
            moon.style.cssText = `
                transform: 
                    translate(0, ${moonAnim.translate}%)
                    scale(${moonAnim.scale})
            `;

            const stairsAnum = {
                translate: 70 / 100 * finalPos,
                scale: 1 + 2/100 * finalPos
            }
            stairs.style.cssText = `
            transform: 
                translate(0, ${stairsAnum.translate}%)
                scale(${stairsAnum.scale})
        `;

        const treeAnum = {
            translate: 70 / 100 * finalPos,
            scale: 1 + 1.5/100 * finalPos
        }
        tree.style.cssText = `
        transform: 
            translate(0, ${treeAnum.translate}%)
            scale(${treeAnum.scale})
    `;

    building.forEach((buildings, index) =>{
        const buildingAnim = {
            translate: 30 * (building.length - index) / 100 * finalPos,
            scale: 1 + 2 / 100 * finalPos
        }
        buildings.style.cssText = `
        transform: 
            translate(0, ${buildingAnim.translate}%)
            scale(${buildingAnim.scale})
        `;
    });

    const trainAnum = {
        translate: 1 * finalPos,
    }
    train.style.cssText = `
    transform: translate(-${trainAnum.translate}%,${trainAnum.translate}%);
       `;

    santaItems.forEach((santaItem, index)=>{
        const santaAnim = {
            left: (100 + (10 * index)) / 100 * finalPos
        }
        santaItem.style.left = `${santaAnim.left}%`
    })
        }
}