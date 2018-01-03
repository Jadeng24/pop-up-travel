
module.exports = {
    getAllProducts: (req, res) => {
        const db = req.app.get('db');
        db.get_all_products().then(products => {

            res.send(products);
        })
    },
    addProduct: (req, res) => {
        const db = req.app.get('db');
        const product = req.body;
        db.add_product(product.category, product.title, product.description, product.imgUrl, product.price, product.in_stock, false)
    },
    removeProduct: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.remove_product([id]);
    },
    changeProductStatus: (req, res) => {
        const db = req.app.get('db');
        const product = req.body;
        const productId = req.params.myId;
        const productStatus = req.params.notStatus
        db.change_product_status([productId, productStatus]).then(product => {
            res.send(product);
        });
    },
    changeProductFeatured: (req, res) => {
        const db = req.app.get('db');
        const product = req.body;
        const productId = req.params.myId;
        const productFeatured = req.params.notFeatured;
        db.change_product_featured([productId, productFeatured]).then(products => {
            res.send(products);
        })
    },
    productDetails: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.get_product_by_id([id]).then(product => {
            res.send(product);
        })
    }
}