console.log('app started');

const gridForm = document.getElementById('gridForm');
const columnCount = document.getElementById('columnCount');
const rowCount = document.getElementById('rowCount');
const buttonCreateGrid = document.getElementById('createGrid');
const buttonAddBox = document.getElementById('addBox');

let gridContainer = document.getElementById('gridContainer');


let isGridCreated = false;

const createGrid = () => {
    //console.log('createGrid()-> called ')
    if(isGridCreated){ 
        //console.log('createGrid()-> condintion isGridCreated true')
        gridContainer.removeAttribute('style');
        gridContainer.innerHTML='';
        gridForm.reset();
        isGridCreated=false;
        return;
    }

    let columns = columnCount.options[columnCount.selectedIndex].value;
    //console.log(columns)
    gridContainer.style.gridTemplateColumns=`repeat(${columns}, 1fr)`;
    gridContainer.style.gap='2px';
    isGridCreated=true;
}

buttonCreateGrid.addEventListener('click',(e)=>{
    e.preventDefault();
    createGrid();
}, {capture:false});

const addBoxTitle = (str) =>{
    let title = document.createElement('h3');
    title.innerHTML= str;
    return title;
}

const addDeleteButton = (box) =>{
    let button = document.createElement('span');
    button.className='delete-box';
    button.innerHTML= 'x';
    
    button.addEventListener('click',(e) => {
        e.preventDefault();
        //console.log(e.target,parent);
        gridContainer.removeChild(box);
        resetBoxTitles();
    })
    return button;
}

const addBox = () =>{
    if(!isGridCreated){
        alert('Please create a grid');
        return;
    }
    let nextBox = document.createElement('div');
    nextBox.setAttribute('class','grid-box');
    nextBox.className='grid-box';
    let boxes = document.getElementsByClassName('grid-box');
    //console.log(boxes);
    nextBox.appendChild(addBoxTitle(`Box ${boxes.length+1}`));
    nextBox.appendChild(addDeleteButton(nextBox));
    //nextBox.innerHTML= `Box ${boxes.length+1}`;
    
    gridContainer.appendChild(nextBox);
}

const resetBoxTitles = ()=>{
    let boxTitles = document.querySelectorAll('.grid-box h3');
    //console.log(boxTitles);
    for(let i=0; i<boxTitles.length; i++){
        console.log(boxTitles[i]);
        boxTitles[i].innerHTML=`Box ${i+1}`;
    }
    
    // boxTitles.forEach((title,index)=>{
    //     console.log(title,index);
    //     title.innerHTML(`Box ${index+1}`);
    //     //title.innerHTML(`Box ${index+1}`);
    // });
}


buttonAddBox.addEventListener('click',(e)=>{
    e.preventDefault();
    addBox();
}, {capture:false});
