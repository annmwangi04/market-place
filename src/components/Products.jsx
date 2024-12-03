/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { db, storage } from "./firebase"; // Ensure correct import
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Add these imports

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
    const [editProduct, setEditProduct] = useState(null);
    const [editDetails, setEditDetails] = useState({ name: "", price: "", image: null });
    const [cart, setCart] = useState([]); // Add state for cart

    const productsCollection = collection(db, "products");

    const fetchProducts = async () => {
        const data = await getDocs(productsCollection);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleImageUpload = async (file) => {
        const storageRef = ref(storage, `product-images/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const addProduct = async () => {
        try {
            if (!newProduct.name || !newProduct.price || !newProduct.image) return;
            const imageUrl = await handleImageUpload(newProduct.image);
            const productWithImage = { ...newProduct, image: imageUrl };
            await addDoc(productsCollection, productWithImage);
            setNewProduct({ name: "", price: "", image: null });
            fetchProducts();
        } catch (error) {
            console.error("Error adding product: ", error.message);
        }
    };

    const updateProduct = async (id) => {
        try {
            const productDoc = doc(db, "products", id);
            if (editDetails.image && typeof editDetails.image !== "string") {
                const imageUrl = await handleImageUpload(editDetails.image);
                editDetails.image = imageUrl;
            }
            await updateDoc(productDoc, editDetails);
            setEditProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product: ", error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const productDoc = doc(db, "products", id);
            await deleteDoc(productDoc);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product: ", error.message);
        }
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Market Place Product Management</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="file"
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                    className="border p-2 mr-2"
                />
                <button onClick={addProduct} className="bg-blue-500 text-white p-2">
                    Add Product
                </button>
            </div>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="flex items-center mb-2">
                        {editProduct === product.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editDetails.name}
                                    onChange={(e) =>
                                        setEditDetails({ ...editDetails, name: e.target.value })
                                    }
                                    className="border p-2 mr-2"
                                />
                                <input
                                    type="number"
                                    value={editDetails.price}
                                    onChange={(e) =>
                                        setEditDetails({ ...editDetails, price: e.target.value })
                                    }
                                    className="border p-2 mr-2"
                                />
                                <input
                                    type="file"
                                    onChange={(e) => setEditDetails({ ...editDetails, image: e.target.files[0] })}
                                    className="border p-2 mr-2"
                                />
                                <button onClick={() => updateProduct(product.id)} className="bg-green-500 text-white p-2 mr-2">
                                    Save
                                </button>
                                <button onClick={() => setEditProduct(null)} className="bg-gray-500 text-white p-2">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="mr-4">
                                    {product.name} - ${product.price}
                                </span>
                                {product.image && <img src={product.image} alt={product.name} className="w-16 h-16 mr-4" />}
                                <button
                                    onClick={() => {
                                        setEditProduct(product.id);
                                        setEditDetails({
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                        });
                                    }}
                                    className="bg-yellow-500 text-white p-2 mr-2"
                                >
                                    Edit
                                </button>
                                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-2 mr-2">
                                    Delete
                                </button>
                                <button onClick={() => addToCart(product)} className="bg-blue-500 text-white p-2">
                                    Add to Cart
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-bold mt-4">Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
