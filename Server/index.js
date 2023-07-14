import  express from 'express';
import { createConnection } from 'mysql';
import cors  from "cors";


const app = express();
app.use(express.json());
app.use(cors());

const conn=createConnection({
    host: "localhost",
    user: "root",
    password: "CDAC",
    database: "grow_digital",
});

conn.connect((error)=>{
    if (error) {
        console.log(error);
    }
    else{
        console.log("Database connected !");
    }
});

app.post('/register',(request,response)=>{
    var insertQry=`INSERT INTO user (username, email, password, address, city) VALUES(
        '${request.body.username}','${request.body.email}',
        '${request.body.password}','${request.body.address}','${request.body.city}')`
    conn.query(insertQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in inserting database'});
        }
        else{
            response.status(200).send({message:'User registered successfully'});
        }
    });
});

app.get('/register',(request,response)=>{
    var selectQry="SELECT * FROM user";
    conn.query(selectQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in fetching from database'});
        } else {
            response.status(200).send(result);
        }
    })
});


app.get('/login/:username/:password', (request, response) => {
   
    var selectQry = "SELECT username, password FROM user WHERE username='"+request.params.username+"' AND password='"+request.params.password+"'";
    conn.query(selectQry, (error, result) => {
        if (error) {
            response.status(500).send({ message: 'Error in fetching database' });
        } else {
            response.status(200).send(result);
        }
    });
});

app.post('/product/add-product',(request,response)=>{
   var insertQry=`INSERT INTO product (proname, description, priceperunit, quantityinkg, noofunits) VALUES (
    '${request.body.proname}','${request.body.description}',
    '${request.body.priceperunit}','${request.body.quantityinkg}','${request.body.noofunits}')`
    conn.query(insertQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in inserting database'});
        }
        else{
            response.status(200).send({message:'Product Added successfully'});
        }
    });
});

app.get('/product/list',(request,response)=>{
    var selectQry="SELECT * FROM product";
    conn.query(selectQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in fetching from database'});
        } else {
            response.status(200).send(result);
        }
    })
});

app.get('/product/:proId',(request,response)=>{
    var selectQry="SELECT * FROM product where proId='"+request.params.proId+"'";
    conn.query(selectQry,(error,result)=>{
        if (error) {
            response.status(500).send({message:'Error in fetching from database'});
        } else {
            response.status(200).send(result);
        }
    })
});

app.put('/product/update/:productId',(request,response)=>{
    var productId = request.params.productId;
    var updateQry=`update product set proname='${request.body.proname}' , description='${request.body.description}' , priceperunit='${request.body.priceperunit}' , quantityinkg='${request.body.quantityinkg}' , noofunits='${request.body.noofunits}' 
    where proID = ${productId}`
    conn.query(updateQry, (error, result) => {
        if (error) {
            response.status(500).send({ message: 'Error in updating database' });
        } else {
            response.status(200).send({ message: 'Product updated successfully' });
        }
    });
});

app.delete('/product/delete/:productId', (request, response) => {
    var productId = request.params.productId;
    var deleteQry = `DELETE FROM product WHERE proId = ${productId}`;

    conn.query(deleteQry, (error, result) => {
        if (error) {
            response.status(500).send({ message: 'Error in deleting from database' });
        } else {
            response.status(200).send({ message: 'Product deleted successfully' });
        }
    });
});


app.listen(9800,()=>{
    console.log('listening on 9800...');
});
