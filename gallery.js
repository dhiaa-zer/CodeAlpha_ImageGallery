
document.addEventListener('DOMContentLoaded',()=>{

let close=document.querySelector('.close') ;
let model=document.querySelector('.model');
let favorite=document.querySelector('.fav') ;
let myfavorites=[];
let myImages=[];
let currentImageSrc = ''; 
let fav_option=document.querySelector('p[data-filter="fav"]');
let all_option=document.querySelector('p[data-filter="All"]');
let gallery=document.querySelector('.gallery');
const next=document.querySelector(".next");
const previous=document.querySelector(".previous");
let currentIndex=0;
let currentpage='all';
let fileInput=document.getElementById('file-upload');
let Delete=document.querySelector('.delete') ;

//functoins

function CloseModel(){
  model.style.display= 'none';
     document.querySelector('body').style.overflow='auto';
}

function OpenModel(image,index){
    currentIndex=index;
    document.querySelector('body').style.overflow='hidden'
    currentImageSrc = image.src; 
    model.querySelector('.Image').src = image.src;
    model.style.display='block';
    if(myfavorites.includes(image.src)){
      favorite.src="icons/icons8-favorite-24 (1).png";
    }
    else{
        favorite.src="icons/icons8-favorite-24.png";
    }
}

function changeFav(){
    if (myfavorites.includes(currentImageSrc)) {

        myfavorites = myfavorites.filter(src => src !== currentImageSrc);
        favorite.src = "icons/icons8-favorite-24.png";
    } else {
       
        myfavorites.push(currentImageSrc);
        favorite.src = "icons/icons8-favorite-24 (1).png";
    }
  }

  function DisplayFav(){
    currentpage='fav';
    gallery.innerHTML = '';
    let html = '';
    myfavorites.forEach(favsrc => {
        html += `<div class="gallery-item"><img src="${favsrc}" alt=""></div>`;
    });
    gallery.innerHTML = html;
      imageEventListener();
  }

  function DisplayAll(){
    currentpage='all';
    gallery.innerHTML = '';
    let html = '';
    myImages.forEach(imgsrc => {
        html += `<div class="gallery-item"><img src="${imgsrc}" alt=""></div>`;
    });
    gallery.innerHTML = html;
     imageEventListener();
     }


function imageEventListener(){
    const images = document.querySelectorAll('.gallery img');
    images.forEach((image,index)=>{
        image.addEventListener('click' ,()=>{
            OpenModel(image,index);
        });
       
     });
}


function nextImage(){
    if(currentpage==='all'){
        currentIndex = (currentIndex + 1) % myImages.length;  
        model.querySelector('.Image').src = myImages[currentIndex];
        currentImageSrc=myImages[currentIndex];
    }
    else{
        currentIndex = (currentIndex + 1) % myfavorites.length;  
      model.querySelector('.Image').src = myfavorites[currentIndex];
     currentImageSrc=myfavorites[currentIndex];
    }
    
    updateIcon();
}

function previousImage(){
    if(currentpage==='all'){
        currentIndex = (currentIndex -1 +myImages.length) % myImages.length;  
        model.querySelector('.Image').src = myImages[currentIndex];
        currentImageSrc=myImages[currentIndex];
    }
    else{
        currentIndex = (currentIndex -1 +myfavorites.length) % myfavorites.length;  
        model.querySelector('.Image').src = myfavorites[currentIndex];
        currentImageSrc=myfavorites[currentIndex];
    }
  
    updateIcon();
}

function updateIcon(){
   favorite.src=myfavorites.includes(currentImageSrc)?"icons/icons8-favorite-24 (1).png"
            : "icons/icons8-favorite-24.png";
}


function DisplayImages(files) {
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newImageSrc = e.target.result;
            myImages.push(newImageSrc); // Add new image source to the array

            // Create a new image element and add it directly to the DOM
            const newImageDiv = document.createElement('div');
            newImageDiv.classList.add('gallery-item');
            
            const newImage = document.createElement('img');
            newImage.src = newImageSrc;
            newImage.alt = '';

            // Add event listener to the new image
            newImage.addEventListener('click', () => {
                OpenModel(newImage, myImages.length - 1);
            });

            newImageDiv.appendChild(newImage);
            gallery.appendChild(newImageDiv); // Append new image to the gallery

        };
        reader.readAsDataURL(files[i]);
    }
}


function DleteImage(){
    myImages= myImages.filter(src=>src !==currentImageSrc);
  
    if(myfavorites.includes(currentImageSrc)){
       myfavorites=myfavorites.filter(src=>src !==currentImageSrc);
    }
    CloseModel();
    if(currentpage==='all'){
        DisplayAll();
    }
    else{
        DisplayFav();
    }
    
}

//event lissteners 
close.addEventListener('click',()=>{
    CloseModel();
});



favorite.addEventListener('click',()=>{
    changeFav();
});


fav_option.addEventListener('click' , ()=>{
    fav_option.classList.add("active");
    all_option.classList.remove("active");
    DisplayFav();
});

all_option.addEventListener('click',()=>{
    all_option.classList.add('active');
    fav_option.classList.remove('active');
    DisplayAll();
});

next.addEventListener('click',()=>{
  nextImage();
});


previous.addEventListener('click',()=>{
    previousImage();
});



fileInput.addEventListener('change',()=>{
    const files=fileInput.files ;
    DisplayImages(files) ;
});

Delete.addEventListener('click',()=>{
     DleteImage();
}) ;

DisplayAll();


}) ;