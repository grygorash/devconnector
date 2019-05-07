import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired
  };

  state = {
    clientId: 'de8921bb8a0c863b0b14',
    clientSecret: 'e37a0cb28f3772858970d0b1701489d9d10d4376',
    count: 5,
    sort: 'created: asc',
    repos: []
  };

  componentDidMount() {
    const {username} = this.props;
    const {count, sort, clientId, clientSecret} = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        if (this.refs.githubRef) {
          this.setState({repos: data});
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const {repos} = this.state;

    return (
      <div ref="githubRef">
        <h3 className="text-center text-info mb-3 mt-3">Latest Github Repos</h3>
        {repos
          .map(
            repo =>
              <div key={repo.id}
                   className="card card-body mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      <a href={repo.html_url}
                         className="text-info"
                         target="_blank"
                         rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h4>
                    {repo.description && <p>{repo.description}</p>}
                  </div>
                  <div className="col-md-6">
                    <span className="badge badge-info mr-1">
                      Stars: {repo.stargazers_count}
                    </span>
                    <span className="badge badge-secondary mr-1">
                      Watchers: {repo.watchers_count}
                    </span>
                    <span className="badge badge-success mr-1">
                      Forks: {repo.forks_count}
                    </span>
                  </div>
                </div>
              </div>)}
      </div>
    );
  }
}

export default ProfileGithub;