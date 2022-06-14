import express from 'express';
import Productos from './container.js';
import productRouter from './Routes/productos.js'
import __dirname from './utils.js'


const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening in PORT ${PORT}`)
})
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );



app.use(express.json())
app.use(express.urlencoded({extended: true}))

const product = new Productos('productos.txt');

app.get('/', (req, res)=>{
    res.render( 'index', {message: ''} )
}) 


app.use('/products', productRouter)