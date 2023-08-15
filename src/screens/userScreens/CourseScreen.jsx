import {
  Button,
  Container,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ADMIN_URL } from "../../constants/adminConstans";
import SearchBar from "../../components/SerachBar";
import CourseCard from "../../components/user/CourseCard";


const CourseScreen = () => {
  const [courseData, setCourseData] = useState([]);
  const [catData, setCatData] = useState([]);

  const fetchCourseData = async () => {
    try {
      const res = await axios.get(ADMIN_URL + "course");
      if (res) {
        setCourseData(res.data.courseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const res = await axios.get(ADMIN_URL + "category");
        if (res) {
          console.log(res);
          setCatData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCatData();
    fetchCourseData();
  }, []);

  const filterCourseByCat = (id) => {
    const filteredCourse = courseData.filter((cours) => {
      return cours.category == id;
    });
    setCourseData(filteredCourse);
  };

  const filterBySerach = (query) => {
    const filteredCourse = courseData.filter((course) => {
      return course.title.toLowerCase().includes(query.toLowerCase());
    });
    setCourseData(filteredCourse);
  };

  return (
    <>
      <CssBaseline />
      <main>
        <CssBaseline />

        <Container sx={{ py: 8 }} maxWidth="lg">
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: "space-between", overflowX: "auto", mb: 3 }}
          >
            <Button
              onClick={() => {
                fetchCourseData();
              }}
              color="inherit"
              noWrap
              variant="outlined"
              sx={{ p: 1, m: 1, flexShrink: 0, borderRadius: 0 }}
            >
              All Course
            </Button>

            {catData.map((cat) => (
              <Button
                color="inherit"
                noWrap
                key={cat._id}
                variant="outlined`"
                onClick={() => {
                  filterCourseByCat(cat._id);
                }}
                sx={{ p: 1, flexShrink: 0, borderRadius: 0, m: 1, border: 1 }}
              >
                {cat.name}
              </Button>
            ))}
          </Toolbar>

          <SearchBar onSearchHandler={filterBySerach} />
          <CourseCard courseData={courseData}/>
        </Container>
      </main>
    </>
  );
};

export default CourseScreen;
