/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import RatingTable from './RatingTable';
import ReviewRender from './ReviewRender';
import RatingStar from './RatingStar';
import style from '../../dist/style.css';


const App = () => {
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    axios.get(`/reviews/${window.location.href.match(/id\s*=\s*(.*)/)[1]}`)
      .then((response) => {
        const reviewData = response.data;
        setReviews(reviewData.reviews);
        setRatings(reviewData.ratings);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.rew_board} >
      <div className={style.seperator24} />
      <div className={style.reviewAndSearchBar}>
        <div className={style.rev_count}>
          {`${reviews.length} Reviews`}
        </div>
        <span className={style.topRatingStar}>
          <RatingStar rating={ratings.overall_rating} />
        </span>
        {/* <SearchBar
        // original_data={this.state.original_data}
        // editSearchText={this.editSearchText}
        // dataSlicer={this.dataSlicer.bind(this)}
        // search_text={this.state.search_text}
        // clearSearchText={this.clearSearchText}
        // setCurPage={this.setCurPage}
        /> */}
      </div>
      <div className={style.seperator16} />
      <div className={style.ratingTable}>
        <RatingTable ratings={ratings} />
      </div>
      <div className={style.review_table}>
        <ReviewRender
          data={reviews}
        // search_text={this.state.search_text}
        // curPage={this.state.curPage}
        // setCurPage={this.setCurPage}
        />
      </div>
    </div>
  )
};

export default App;
