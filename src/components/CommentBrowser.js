import { Button, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserComments } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import Comment from "./Comment";
import Loading from "./Loading";
import SortBySelect from "./SortBySelect";
import {TbMoodEmpty} from "react-icons/tb";
import {BsCheck2Circle} from "react-icons/bs";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

const CommentBrowser = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const user = isLoggedIn();

  const fetchComments = async () => {
    setLoading(true);

    const newPage = page + 1;
    setPage(newPage);

    let comments = await getUserComments({
      id: props.profileUser._id,
      query: { sortBy },
    });

    setComments(comments);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [sortBy]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setComments([]);
    setPage(0);
    setEnd(false);
    setSortBy(newSortBy);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sorts = {
    "-createdAt": "Latest",
    createdAt: "Earliest",
  };

  return (
    <Stack spacing={2}>
      <Card>
        <SortBySelect onSortBy={handleSortBy} sortBy={sortBy} sorts={sorts} />
      </Card>
      {loading ? (
        <Loading />
      ) : (
        <>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} profile />
            ))}

          <Stack py={5} alignItems="center">
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {comments.length > 0 ? (
                <>
                <BsCheck2Circle />
                All comments have been viewed
                </>
              ) : (
                <>
                <TbMoodEmpty />
                No comments available
                </>
              )}
            </Typography>
            <Fab variant="extended" onClick={handleBackToTop}>
              <NavigationIcon />
              </Fab>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CommentBrowser;