import express from 'express';
import productRouter from './Routes/productos.js'
import __dirname from './utils.js'

const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening in PORT ${PORT}`)
})
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/index', (req, res)=>{
    res.render( 'index', {mesage: ''} )
}) 


app.use('/products', productRouter)