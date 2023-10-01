// import React from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Modal from "react-bootstrap/Modal";
// import { useState, useEffect } from "react";
// import Axios from "axios";
// import Product from "../../components/Home/product";
// import { UilShoppingCart } from "@iconscout/react-unicons";
// import { useNavigate } from "react-router-dom";

// export default function HomeProduct() {
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState({});
//   const handleClose = () => setShow(false);
//   const handleShow = (product) => {
//     setSelectedProduct(product);
//     setShow(true);
//   };

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     Axios.get("http://localhost:9020/api/foods").then((response) => {
//       setProducts(response.data);
//     });
//   }, []);

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div>
//       <div className="col-2" style={{ marginLeft: "3rem" }}>
//         <input
//           type="text"
//           className="form-control"
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search product"
//           style={{ padding: "0.7rem", margin: "2rem 0" }}
//         />
//       </div>
//       <div className="product_cards">
//         {filteredProducts.map((product) => (
//           <div key={product._id}>
//             <Card style={{ width: "18rem" }}>
//               <Card.Img
//                 src={product.image}
//                 variant="top"
//                 style={{ height: "200px" }}
//               />

//               <Card.Body>
//                 <Card.Title>{product.name}</Card.Title>
//                 <Card.Text
//                   style={{
//                     textOverflow: "ellipsis",
//                     overflow: "hidden",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {product.description}
//                 </Card.Text>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   {product.category}
//                 </Card.Subtitle>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   LKR {product.price}
//                 </Card.Subtitle>
//                 <Modal show={show} onHide={handleClose}>
//                   <Modal.Header closeButton>
//                     <Modal.Title>Product Details</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     <Product product={selectedProduct} />
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                       Reviews
//                     </Button>
//                     <Button
//                       variant="primary"
//                       onClick={() => navigate(`/product/${product._id}`)}
//                     >
//                       <UilShoppingCart size="20" />
//                     </Button>
//                   </Modal.Footer>
//                 </Modal>
//                 <Button
//                   variant="primary"
//                   onClick={() => navigate(`/product/${product._id}`)}
//                 >
//                   View Product
//                 </Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
