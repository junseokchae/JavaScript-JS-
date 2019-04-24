function pickSquare() {
    var mat;
    let a,b,c,d,e,f,g,h,i;
    a = Math.round(Math.random()*10);
    while(true){
        b = Math.round(Math.random()*10);
        if(a != b)
            break;
    }
    while(true){
        c = Math.round(Math.random()*10);
        if(c != a && c !=b)
            break;
    }
    while(true){
        d = Math.round(Math.random()*10);
        if(d != a && d != b && d != c)
            break;
    }
    while(true){
        e = Math.round(Math.random()*10);
        if(e != a && e != b && e != c && e != d)
            break;
    }
    while(true){
        f = Math.round(Math.random()*10);
        if(f != a && f != b && f != c && f != d && f != e)
            break;
    }
    while(true){
        g = Math.round(Math.random()*10);
        if(g != a && g !=b && g != c && g != d && g != e && g != f)
            break;
    }
    while(true){
        h = Math.round(Math.random()*10);
        if(h != a && h != b && h != c && h != d && h != e && h != f && h != g)
            break;
    }
    while(true){
        i = Math.round(Math.random()*10);
        if(i != a && i !=b && i != c && i != d && i != e && i != f && i != g && i != h)
            break;
    }
    mat = [[a,b,c],[d,e,f],[g,h,i]]
    console.log([a,b,c]);
    console.log([d,e,f]);
    console.log([g,h,i]);
    console.log("First Diagonal: " + [a,e,i]);
    console.log("Second Diagonal: " + [c,e,g]);
    return mat;
}

function calculateDiagonals(mat){
    console.log(mat);
    let firstDiagonal,secondDiagonal,result;
    /*let a = parseInt(mat[0][0]);
    let b = parseInt(mat[0][1]);
    let c = parseInt(mat[0][2]);
    let d = parseInt(mat[1][0]);
    let e = parseInt(mat[1][1]);
    let f = parseInt(mat[1][2]);
    let g = parseInt(mat[2][0]);
    let h = parseInt(mat[2][1]);
    let i = parseInt(mat[2][2]);*/
    firstDiagonal = 0;
    secondDiagonal = 0;
    for(let i=0;i<mat.length;i++){
        firstDiagonal += mat[i][i];
        secondDiagonal += mat[i][mat.length-i-1];
    }
    
    //firstDiagonal = a + e + i;
    //secondDiagonal = c + e + g;
    console.log("Sum of the First Diagonal: " + firstDiagonal);
    console.log("Sum of the Second Diagonal: " + secondDiagonal);
    result = Math.abs(firstDiagonal - secondDiagonal);
    console.log("Difference of them: " + result);

}
var matrix = pickSquare();
console.log(matrix);
calculateDiagonals(matrix);
