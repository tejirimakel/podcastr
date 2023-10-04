import React, { Component } from 'react';
import styled from 'styled-components';
import BlogBox from '../components/Elements/BlogBox';
import Loader from '../components/Loader';
import TestimonialSlider from '../components/Elements/TestimonialSlider';
import blogService from '../features/blog/blogService';
import { ucwords, timeAgo } from '../common/utils';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      page: 0,
      isLoading: true,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  prepDataAndUpdateState(res) {
    if (res == null) res = [];
    const blogs = [];
    res.forEach((p) => {
      blogs.push({
        id: p.id,
        author: {
          id: p.author,
          name: ucwords(p.uagb_author_info.display_name),
          link: p.uagb_author_info.author_link,
        },
        categories: p.categories,
        excerpt: p.uagb_excerpt,
        title: p.title.rendered,
        link: p.link,
        slug: p.slug,
        type: p.type,
        thumbnail: p.uagb_featured_image_src.medium[0],
        created_at: p.date,
        updated_at: p.modified,
        time_ago: timeAgo(p.modified),
        status: p.status,
      });
    });
    this.setState({
      blogs: blogs,
      page: this.state.page + 1,
      isLoading: false,
    });
  }

  componentDidMount() {
    blogService
      .getBlogPosts()
      .then((res) => {
        this.prepDataAndUpdateState(res);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  loadMore(idx) {
    if (this.state.isLoading) return;

    this.setState({
      isLoading: true,
    });
    blogService
      .getBlogPosts(idx)
      .then((res) => {
        this.prepDataAndUpdateState(res);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  render() {
    return (
      <Wrapper id="blog">
        <div className=" pt-5">
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Industry Insights</h1>
              <p className="font13 pt-2">
                Resources, DIYs, Tips and News For the African Audio Creative.
              </p>
            </HeaderInfo>
            <div className="row textCenter text-black">
              {this.state.blogs.map((post, idx) => (
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <BlogBox
                    key={post.id}
                    title={post.title}
                    text={post.excerpt}
                    link={post.link}
                    thumbnail={post.thumbnail}
                    tag="company"
                    author={`${post.author.name}, ${post.time_ago}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between py-20">
              {this.state.page > 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => this.loadMore(this.state.page - 1)}
                >
                  {this.state.isLoading ? <Loader /> : <></>}
                  <span>Newer</span>
                </button>
              ) : (
                <></>
              )}

              {this.state.blogs.length === 6 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => this.loadMore(this.state.page + 1)}
                >
                  {this.state.isLoading ? <Loader /> : <></>}
                  <span>Older</span>
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="lightBg" style={{ padding: '50px 0' }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold text-black">What They Say?</h1>
              <p className="font13 text-black pt-2">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut
                <br />
                labore et dolore magna aliquyam erat, sed diam voluptua.
              </p>
            </HeaderInfo>
            <TestimonialSlider />
          </div>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
