import express from 'express'
import Productos from '../container.js'


const product = new Productos('productos.txt');

product.init();

const router = express.Router();

router.get('/', (req, res)=>{
    res.send(product.data)
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const idNumber = Number(id);
    
    if (isNaN(idNumber)) {
        return res.status(400).send({ error: 'El parámetro debe ser un número' });
    }
    
    if (idNumber > product.data.length) {
        return res.status(400).send({ error: 'El parámetro está fuera de rango' });
    }
    
    if (idNumber < 0) {
        return res.status(400).send({ error: 'El parámetro debe ser mayor a cero' });
    }
    
    const person = await product.getById(idNumber);
    
    if (!person) {
        return res.status(400).send({ error: `El producto con el id: ${id} no existe` });
    }
    
    return res.send(person)
})

router.post('/', async (req, res)=>{
    const { title, price, thumbnail } = req.body;
    
    if (!title || !price|| !thumbnail) {
        return res.status(400).send({ error: 'Los datos están incompletos' });
    }
    
    await product.save({ title, price, thumbnail });
    await product.init();
    return res.send({ message: 'Producto agregado exitosamente'})
})

/* router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { field, value } = req.body;
        
        await product.editById(Number(id), field, value);
        
        res.send({ message: `El producto con id: ${id} se modificó exitosamente`})
    } catch (error) {
        throw error
    }
    
}) */

router.put('/:id', (req, res)=>{
    const idx = this.product.findIndex(p => p.id == id)

    if(idx === -1){
        res.send('El producto que desea modificar no existe')
    }else{
        this.product.splice(idx, 1, product)
        res.json(product)
    } 
})

router.delete('/id', (req,res)=>{
        const idx = this.product.findIndex(p => p.id == id)

        if(idx === -1){
            res.send('El producto que desea eliminar no existe')
        }else{
            this.product.splice(idx, 1)
            res.json(`Se elimino el producto con id: ${id}`)
        } 
}) 
export default router



