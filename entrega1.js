
const fs = require('fs')

const {cursos} = require( './cursos' )


let id = 0

const crearTxt = ( id, nombre, cc, curso ) => {
    let txt = `El estudiante ${nombre} \ncon Cedula ${cc} 
Se ha matriculado en el curso llamado "${curso.nombre}"
tiene una duración de de ${curso.duracion}
y un valor de ${curso.valor}
    `
    fs.writeFile('Matricula.txt', txt, (err) => {
        if( err ){
            throw err
        }else{
            console.log('Documento registrado: Matricula.txt')
        }
    })
}

const listarCurso = (curso_ , segundos, callback) =>{
    setTimeout(function(){
        callback( curso_ )
    }, segundos)
}
const listarCursos = () => {
    let i = 0, seg = 0
    for( i in cursos ){
        let curso = cursos[i]

        listarCurso(curso, seg, function( c ){
            console.log( `ID=${c.id}. Curso=${c.nombre}. Duracion=${c.duracion}. Valor=${c.valor}` )
        })
        seg = +seg + 2000
    }
}

const opciones = {
    id: { demand: true, alias: 'i' },
    nombre: { demand: true, alias: 'n' },
    cedula:{ demand: true, alias:'c'}
}
const argv = require('yargs')
    .command('inscribir', 'Inscribirme en un curso', opciones)
    .argv

//console.log( argv )
//console.log( cursos )

if( argv.i === undefined && argv.i == null ){
    listarCursos()
}
else{ // Inscribir
    let id = argv.i

    let cursoSeleccion = null
    cursoSeleccion = cursos.find( curso => {
        if( curso.id === id ) return curso
     })
    
    if( cursoSeleccion != null ){
        crearTxt( argv.i, argv.n, argv.c, cursoSeleccion )
    }
    else{
        console.log('Ha ingresado un ID que no corresponde a ningun Curso:')
        listarCursos()
    }

}


