import React, {Component} from 'react';

import './search-gallery-component.scss'

interface ISearchProps {
    searchItemOnPexelGalleryEvent: any
}

interface ISearchState {
    textPexelsSearch: string
}

class SearchGalleryComponent extends Component<ISearchProps, ISearchState> {
    constructor(props: ISearchProps) {
        super(props);
        this.state = {
            textPexelsSearch: ""
        }
    }
    render() {
        const {searchItemOnPexelGalleryEvent} = this.props
        return (
            <div className={'search-view'}>
                <div>
                    <input type="text" className={'search-input-text'} onChange={evn => this.updateValue(evn)}/>
                    <button type={"submit"} className={'search-button'} onClick={() => searchItemOnPexelGalleryEvent(this.state.textPexelsSearch)}>Search</button>
                </div>
            </div>
        );
    }

    private updateValue(e: any) {
        this.setState({textPexelsSearch: e.target.value})
    }
}

export default SearchGalleryComponent;
