import React from "react"
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionAndroid from 'material-ui/svg-icons/action/delete'
import ContentRefresh from 'material-ui/svg-icons/content/undo'
import {fullWhite} from 'material-ui/styles/colors'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default class AddMovieComponent extends React.Component {
   addMovie(e) {
        e.preventDefault();
        const {movies} = this.props;
        const newMovie = {
            id: '1',
            title: this.newItem.value,
            poster: ''
        };

        console.log(newMovie.title);
        console.log(movies);
        this.addForm.reset();
    }

  refreshList(e) {
    e.preventDefault();
    console.log('refreshlist')
  }

  render() {
    return (
      <form className="form-inline form-center"
          onSubmit={(e) => this.addMovie(e)}
          ref={input => this.addForm = input}>
    
          <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">Add new movie</label>

              <FloatingActionButton type="button"
                                    onClick={this.refreshList.bind(this)}
                                    className="translate-right"
                                    mini={true}
                                    icon={<ActionAndroid color={fullWhite}/>}>
                  <ContentRefresh />
              </FloatingActionButton>
              <input ref={(input) => {
                  this.newItem = input
              }}
                      type="text" placeholder="enter movie"
                      className="form-control form-center"
                      id="newItemInput"/>
              <FloatingActionButton type="submit"
                                    className="translate-left"
                                    mini={true}
                                    icon={<ActionAndroid color={fullWhite}/>}>
                  <ContentAdd />
              </FloatingActionButton>
          </div>

      </form>
    )
  }
}