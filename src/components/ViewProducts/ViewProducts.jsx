import { Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../ProductCard/Card";
import "./ViewProducts.css";
import axios from "../../axios"
import * as actions from "../../states/actionCreators/actions"
import { useEffect, useState } from "react";
// import RecipeReviewCard from "../ProductCard/Card";

const AddProduct = ({ viewOnly, isEditable }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser || null)
  const [products, setProducts] = useState([])
  async function fetchProducts() {
    try {
      await axios.get("/all_products").then(res => { setProducts(res.data) });
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    dispatch(actions.resetProductToBeEdited())
    fetchProducts()


  }, []);
  // console.log(products[0])
  // const products = [
  //   {
  //     name: "Cuisinart C55-12PMB Advantage 12 Piece Metallic Knife Set With Blade Guards, Black",
  //     id: "1",
  //     description:
  //       "Set includes: 8' chef, 8' slicing, 8' bread knives, a 7' Santoku, 6.5' serrated Utility, and finally a 3.5' Paring knife High-quality stainless steel blades Nonstick coating for easy slicing Each knife comes with a matching blade guard",
  //     price: "300",
  //     currency: "$",
  //     stock: "100",
  //     url: "https://source.unsplash.com/1600x900/?knife",
  //     discount: "40",
  //     shipsTo: "Ships to Pakistan",
  //   },
  //   {
  //     name: "Spoon",
  //     id: "2",
  //     description:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat quae numquam sit sint molestiae architecto quaerat voluptas veritatis, sequi excepturi animi mollitia reiciendis perspiciatis soluta. Quod maxime minus atque voluptatibus laudantium harum. Quibusdam quae perferendis maiores repellendus ab cupiditate mollitia. Consequuntur dicta odit repellendus cum eligendi nesciunt, optio laudantium fugiat est corrupti mollitia? A dolore beatae sed commodi accusantium animi, minus modi voluptas perferendis eum excepturi maxime, natus laborum, numquam corrupti? Omnis reprehenderit molestiae adipisci tempore nemo natus similique voluptatum! Quos eaque soluta cupiditate, unde ipsam fugiat, ducimus iusto doloremque porro laboriosam repellat tenetur ex, quo iste deleniti dolor officiis impedit vel numquam explicabo. Quas numquam tempora eaque eligendi libero et eius aspernatur dolorum, odio aliquid repudiandae, unde tempore minima voluptates. Non officiis nisi incidunt ipsam sunt quas culpa, accusantium, quos natus rerum consectetur, odio quidem iure distinctio corporis facere nihil dolorem explicabo eum pariatur. Soluta officiis culpa architecto, animi porro nesciunt odio! Obcaecati corporis omnis ullam tempore eveniet natus repudiandae quibusdam fugiat asperiores ut maxime, assumenda velit nostrum magni voluptas aliquid blanditiis consequuntur exercitationem unde quidem adipisci laboriosam at dolorum optio! Tenetur porro minus esse autem commodi obcaecati nulla dolorum debitis quae. Ipsam cum, assumenda repudiandae delectus quisquam ipsum dolore rem, necessitatibus hic quae modi laudantium veniam! Labore, exercitationem ad officiis nisi molestiae, iusto maiores, recusandae perspiciatis alias nobis voluptates incidunt. Ipsam atque in quas magnam ullam, at debitis tempora, facere nulla, nesciunt aliquid ducimus beatae et illo veniam ab doloremque possimus. Ratione porro, fugit aperiam aspernatur rem minus.",
  //     price: "100",
  //     currency: "$",
  //     url: "https://source.unsplash.com/1600x900/?tablespoon",
  //     stock: "0",
  //     discount: "10",
  //     shipsTo: "Ships to Pakistan",
  //   },
  //   {
  //     name: "Fork",
  //     id: "3",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corrupti sunt similique porro minus odio maiores, quibusdam magni, ad temporibus esse. Eius, vitae. Voluptates temporibus earum saepe, vero officia veritatis quos.",
  //     price: "50",
  //     currency: "$",
  //     url: "https://source.unsplash.com/1600x900/?fork",
  //     stock: "200",
  //     discount: "0",
  //     shipsTo: "Ships to Pakistan",
  //   },
  //   // {
  //   //   name: "Pots",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corrupti sunt similique porro minus odio maiores, quibusdam magni, ad temporibus esse. Eius, vitae. Voluptates temporibus earum saepe, vero officia veritatis quos.",
  //   //   price: "50",
  //   //   currency: "$",
  //   //   url: "https://source.unsplash.com/1600x900/?pots",
  //   //   stock: "200",
  //   //   discount: "0",
  //   //   shipsTo: "Ships to Pakistan",
  //   // },
  //   // {
  //   //   name: "Cuisinart C55-12PMB Advantage 12 Piece Metallic Knife Set With Blade Guards, Black",
  //   //   description:
  //   //     "Set includes: 8' chef, 8' slicing, 8' bread knives, a 7' Santoku, 6.5' serrated Utility, and finally a 3.5' Paring knife High-quality stainless steel blades Nonstick coating for easy slicing Each knife comes with a matching blade guard",
  //   //   price: "300",
  //   //   currency: "$",
  //   //   stock: "100",
  //   //   url: "https://source.unsplash.com/1600x900/?knife",
  //   //   discount: "40",
  //   //   shipsTo: "Ships to Pakistan",
  //   // },
  //   // {
  //   //   name: "Spoon",
  //   //   description:
  //   //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat quae numquam sit sint molestiae architecto quaerat voluptas veritatis, sequi excepturi animi mollitia reiciendis perspiciatis soluta. Quod maxime minus atque voluptatibus laudantium harum. Quibusdam quae perferendis maiores repellendus ab cupiditate mollitia. Consequuntur dicta odit repellendus cum eligendi nesciunt, optio laudantium fugiat est corrupti mollitia? A dolore beatae sed commodi accusantium animi, minus modi voluptas perferendis eum excepturi maxime, natus laborum, numquam corrupti? Omnis reprehenderit molestiae adipisci tempore nemo natus similique voluptatum! Quos eaque soluta cupiditate, unde ipsam fugiat, ducimus iusto doloremque porro laboriosam repellat tenetur ex, quo iste deleniti dolor officiis impedit vel numquam explicabo. Quas numquam tempora eaque eligendi libero et eius aspernatur dolorum, odio aliquid repudiandae, unde tempore minima voluptates. Non officiis nisi incidunt ipsam sunt quas culpa, accusantium, quos natus rerum consectetur, odio quidem iure distinctio corporis facere nihil dolorem explicabo eum pariatur. Soluta officiis culpa architecto, animi porro nesciunt odio! Obcaecati corporis omnis ullam tempore eveniet natus repudiandae quibusdam fugiat asperiores ut maxime, assumenda velit nostrum magni voluptas aliquid blanditiis consequuntur exercitationem unde quidem adipisci laboriosam at dolorum optio! Tenetur porro minus esse autem commodi obcaecati nulla dolorum debitis quae. Ipsam cum, assumenda repudiandae delectus quisquam ipsum dolore rem, necessitatibus hic quae modi laudantium veniam! Labore, exercitationem ad officiis nisi molestiae, iusto maiores, recusandae perspiciatis alias nobis voluptates incidunt. Ipsam atque in quas magnam ullam, at debitis tempora, facere nulla, nesciunt aliquid ducimus beatae et illo veniam ab doloremque possimus. Ratione porro, fugit aperiam aspernatur rem minus.",
  //   //   price: "100",
  //   //   currency: "$",
  //   //   url: "https://source.unsplash.com/1600x900/?tablespoon",
  //   //   stock: "0",
  //   //   discount: "10",
  //   //   shipsTo: "Ships to Pakistan",
  //   // },
  //   // {
  //   //   name: "Fork",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corrupti sunt similique porro minus odio maiores, quibusdam magni, ad temporibus esse. Eius, vitae. Voluptates temporibus earum saepe, vero officia veritatis quos.",
  //   //   price: "50",
  //   //   currency: "$",
  //   //   url: "https://source.unsplash.com/1600x900/?fork",
  //   //   stock: "200",
  //   //   discount: "0",
  //   //   shipsTo: "Ships to Pakistan",
  //   // },
  //   // {
  //   //   name: "Pots",
  //   //   description:
  //   //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corrupti sunt similique porro minus odio maiores, quibusdam magni, ad temporibus esse. Eius, vitae. Voluptates temporibus earum saepe, vero officia veritatis quos.",
  //   //   price: "50",
  //   //   currency: "$",
  //   //   url: "https://source.unsplash.com/1600x900/?pots",
  //   //   stock: "200",
  //   //   discount: "0",
  //   //   shipsTo: "Ships to Pakistan",
  //   // },
  // ];
  return (
    <>

      {user !== null ?
        <div>
          <Grid
            container
            p={3}
            columnSpacing={5}
            rowSpacing={3}
            justifyContent="center"
          >
            {products[0] !== {} ?

              products.map((prod) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sm={6}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card product={prod} viewOnly={viewOnly} isEditable={isEditable} />
                  </Grid>
                );
              }) : <>HELLO</>}
          </Grid>
        </div>
        : <></>}
    </>
  )
};

export default AddProduct;
