import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { razorPay } from "../../services/razorPay";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import Lessons from "../../components/user/lessons";
import { userApi } from "../../services/api";
import CourseReview from "./CourseReview";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [enrolled, setEnrolled] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const authToken = userInfo?.token;
  console.log(authToken, "..........", userInfo, ".................");

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const res = await userApi.get(`course/view?id=${id}`);
        if (res) {
          setCourse(res.data.courseData);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    getCourseData();
  }, []);

  useEffect(() => {
    const fetchMyCourseData = async () => {
      try {
        const res = await userApi.get(`my_courses?id=${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res) {
          res.data.forEach((course) => {
            if (course._id === id) {
              setEnrolled(true);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyCourseData();
  }, []);

  const paymentHandler = async (amount) => {
    if (!userInfo) {
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }
    const res = await razorPay(amount);
    console.log(res, "am razorpay responseeee");
    if (res) {
      try {
        const res = await userApi.post(
          "payment",
          {
            userId,
            courseId: id,
            paymentMode: "razorpay",
            amount,
          },
        )
        if (res) {
          navigate("/success");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Paper
      sx={{
        width: 1200,
        pt: 1,
        pb: 2,
        ml: "auto",
        mr: "auto",
        mt: 5,
        backgroundColor: "#e8ecec",
      }}
    >
      <Box sx={{ height: "auto", width: 1000, my: 10, ml: "auto", mr: "auto" }}>
        <Grid item xs={12} md={6}>
          <CardActionArea>
            <Card sx={{ display: "flex", height: 280 }}>
              <CardContent sx={{ flex: 1, mt: 2 }}>
                <Typography component="h2" variant="h5">
                  {course.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography mt={1} variant="subtitle2" paragraph>
                  Just for Rs: <LiaRupeeSignSolid />{" "}
                  <strong> {course.price} </strong>
                  <span>&nbsp;</span>
                  <s> 2999</s>
                </Typography>
                {/* {console.log(course, course.tutor._id, '?????????????????????????')} */}
                <Link to={`/filter_tutor/${course?.tutor?._id}`}>
                  By : {course?.tutor?.firstName}
                </Link>
                <Box mt={1}>
                  <Rating
                    precision={0.5}
                    name="read-only"
                    value={course.rating}
                    readOnly
                  />
                </Box>

                {enrolled ? (
                  <Link to={`/watch/${course._id}`}>
                    <Button sx={{ mb: 2, mt: 2 }} variant="contained">
                      Watch now
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => paymentHandler(course.price)}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Buy now
                  </Button>
                )}
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: "auto", display: { xs: "none", sm: "block" } }}
                image={course.thumbnail}
                alt="imageLabel"
              />
            </Card>
          </CardActionArea>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Accordion sx={{ py: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="title" component={"h2"}>
                View all lossons details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Lessons
                courseId={course._id}
                width={160}
                height={130}
                status={true}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ py: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="title" component={"h2"}>
                See Review and Ratinngs
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <CourseReview id={id} />
            </AccordionDetails>
          </Accordion>
        </Box>
        {/* <Typography sx={{ fontSize: 20, mt: 6, ml: 2 }}>Ratings</Typography>
        <Divider sx={{ color: "#ffffff" }} />
        <Typography sx={{ fontSize: 18, mt: 2, ml: 2 }}>
          No ratings available
        </Typography> */}
      </Box>
    </Paper>
  );
};

export default CourseView;
