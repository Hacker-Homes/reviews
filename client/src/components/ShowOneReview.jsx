import React from 'react';
import style from '../../dist/style.css';


const CHAR_THRESHOLD = 250;
const WORDS_THRESHOLD = 50;
class ShowOneReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_content: false,
    }
  }

  showContent(e) {
    e.preventDefault();
    this.setState({
      show_content: true,
    });
  }

  render() {
    let gender = this.props.review.gender === 1 ? 'men' : 'women';
    let profilePicNum = 10;
    let url = `https://s3.us-east-2.amazonaws.com/wtsesun/fakeprofilepics/${gender}/${profilePicNum}.jpg`;
    return (
      <div className={style.review} key={this.props.review.id}>
        <div className={style.pictureNameAndDate}>
          <div className={style.profile_picture} key={this.props.review.id + 'p'}
            style={{ backgroundImage: `url(${url})` }}
          />

          <div className={style.nameAndDate}>
            <div className={style.name} key={this.props.review.id + 'n'}>{this.props.review.name}</div>
            <div className={style.date} key={this.props.review.id + 'd'}>{(new Date(this.props.review.date).toLocaleDateString('en-US'))}</div>
          </div>
        </div>
        <div className={style.sentence}>
          {this.props.review.comment}
        </div>
        <div className={style.seperator24}></div>
      </div>
    );
  }
}



export default ShowOneReview;