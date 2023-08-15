import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Container,
  CssBaseline,
  Grid,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import { ADMIN_URL } from "../../constants/adminConstans";
import { Link } from "react-router-dom";

const cards = [1, 2, 3, 4, 5, 6,];

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B8291",
    },
  },
});

export default function CategoryCard() {

    const [categoryData, setCategoryData] = useState([])

   useEffect(() => {
    const loadCategory = async() => {
        try {
          const res = await axios.get(ADMIN_URL+ 'category')
          if(res){
            console.log(res);
            setCategoryData(res.data)
          }
        } catch (error) {
          console.log(error);
        }
      }
      loadCategory()
      
   }, [])


  return (
    <>
        <CssBaseline />
        
        <Container
          component="main"
          sx={{ mt: 8, mb: 2, border: 1, p: 3, textAlign: "center"}}
          maxWidth="lg"
          alignItems={"center"}
        >
          
          <Typography variant="h5" component="h2" gutterBottom>
            {"Most Enrolled Category "}
            {/* {"The footer will move as the main element of the page grows."} */}
          </Typography>
          <Typography variant="body1">Most Enrolled Category for you</Typography>
        </Container>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
          
            {categoryData.map((cat) => (
              
              <Grid item key={cat._id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                     
                      component="img"
                      height="140"
                      image={cat.imageUrl}
                      alt="green iguana"
                    />
                    <CardContent component={Link} to={`/filtered/${cat._id}`} style={{  textAlign: 'center', textDecoration: 'none', color: '#244D61' }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {cat.name}
                      </Typography>
                     
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
             
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
