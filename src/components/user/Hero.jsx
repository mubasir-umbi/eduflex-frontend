import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { USERS_URL } from "../../constants/usersConstants";
import CourseCard from "./CourseCard";



const Hero = () => {
  const [courseData, setCourseData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await axios.get(USERS_URL + "course/popular");
        if (res) {
          console.log(res);
          setCourseData(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCourse();
  }, []);

  return (
   
    
      <main>
          <CssBaseline />
        {/* Hero unit */}
        <Box
          component={Paper}
          m={1}
        >
          <Container
            maxWidth="xl"
            sx={{
              backgroundImage: `url(${"https://source.unsplash.com/BJx8whKXCgc"})`,
              minHeight: "250px",
              maxHeight: '550px',
              p: 10,
              backgroundSize: "cover",
            }}
          >
            <Box
              style={{
                // backgroundColor: "rgba(0, 0, 0, 0.2)",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.secondary"
                gutterBottom
                sx={{ color: "#000000" }}
              >
                Comprehensive learning programs & classes for all students
              </Typography>
            </Box>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{ maxWidth: "sm", mt: 6 }}
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }}
            >
              Become lifelong learners with India's best teachers, engaging
              video lessons and personalised learning journeys
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to={'/course'}>
              <Button sx={{borderRadius: 0}} variant="contained">Explore Courses</Button>
              </Link>
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>

        <CssBaseline />
        <Container
          component="main"
          sx={{ mt: 8, mb: 2, border: 1, p: 3, textAlign: "center"}}
          maxWidth="lg"
          alignItems={"center"}
        >
          
          <Typography variant="h5" component="h2" gutterBottom>
            {"Popular courses for you"}
            {/* {"The footer will move as the main element of the page grows."} */}
          </Typography>
          <Typography variant="body1">Popular courses for you</Typography>
        </Container>

        <CourseCard courseData={courseData}/>
      </main>
  );
};

export default Hero;
