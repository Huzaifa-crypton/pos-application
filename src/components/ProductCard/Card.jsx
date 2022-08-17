import * as React from "react";
import "./Card.css";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import * as actions from "../../states/actionCreators/actions"
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { baseURL } from "../../axios";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const trimText = (string, length) => {
  // console.log(string)
  return string.substring(0, length);
};

const RecipeReviewCard = ({ product, viewOnly, isEditable = false }) => {

  const dispatch = useDispatch();  // for dispatching an action for changing central state

  const editProduct = (product) => {
    dispatch(actions.productToBeEdited(product))
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [count, setCount] = React.useState(1);
  // const [invisible, setInvisible] = React.useState(false);
  return (
    <Card sx={{ width: 345, maxHeight: "max-content" }}>
      {isEditable === true ?
        <Link aria-current="page" style={{ color: "black", textDecoration: "none" }} to={`/Edit_Product`}>
          <Fab color="warning" aria-label="edit" size="small" style={{ marginLeft: "5%", marginTop: "5%" }}>
            <EditIcon onClick={() => editProduct(product)} />
          </Fab>
        </Link>
        :

        <></>}

      <CardHeader title={product.name} subheader={product.shipsTo} />

      <hr style={{ borderTop: "1px solid lightGrey", width: "85%", margin: "0 auto", }}></hr>
      <br />
      <CardMedia
        component="img"
        height="194"
        image={`${baseURL}/${product.url}`}
        loading="lazy"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.desc.length > 250 ? (
            <>
              {trimText(product.desc, 250) + "..."}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </>
          ) : (
            product.desc
          )}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><strong>Description:</strong></Typography>
          <Typography paragraph>{product.desc}</Typography>
        </CardContent>
      </Collapse>
      <hr style={{ borderTop: "1px solid lightGrey", width: "85%", margin: "0 auto", }}></hr>

      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{product.currency + product.price}</h4>
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
          size="small"
        />
      </CardActions>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Tooltip title="Discount">
          {parseFloat(product.discount) !== 0 ? (
            <h4>{product.discount + "% OFF"}</h4>
          ) : (
            <></>
          )}
        </Tooltip>

        {parseInt(product.stock) !== 0 ? (
          <h6>{product.stock + " items available"} </h6>
        ) : (
          <h6 style={{ color: "red" }}>{"Out of Stock"}</h6>
        )}
      </CardActions>
      {
        viewOnly ? <></> :
          <CardActions style={{ display: "flex", justifyContent: "space-around", bottom: "0%" }}>
            <ButtonGroup>
              <Tooltip title="Decrease">
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
              </Tooltip>
              <Tooltip title="Increase">
                <Button
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Tooltip>
            </ButtonGroup>
            <Tooltip title="Product Qunatity Selected">
              <Badge color="secondary" badgeContent={count}></Badge>
            </Tooltip>
            <Tooltip title="Add to cart">
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
      }

    </Card >
  );
};
export default RecipeReviewCard;
