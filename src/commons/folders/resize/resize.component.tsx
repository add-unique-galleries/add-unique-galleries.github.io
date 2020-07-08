import React, {Component} from 'react';
import './resize.component.scss'
class ResizeComponent extends Component {
    render() {
        return (
            <div className={'resize'} onMouseDown={this.resizeContainer}/>
        );
    }

    private resizeContainer(e: any) {
        e.preventDefault()
        const resizes = document.querySelector('.resize')
        resizes?.addEventListener('mousemove', ResizeComponent.resize)
        resizes?.addEventListener('mouseup', ResizeComponent.stopResize)
    }
    private static resize(e: any) {
        const element = document.getElementById('root-folder')
        // @ts-ignore
        element?.style.width = e.pageX + 'px';
        const resizes = document.querySelector('.resize')
        // @ts-ignore
        resizes.style.left = element?.style.width
        const carouselEl = document.querySelector('.carousel')
        // @ts-ignore
        carouselEl?.style.left = element?.style.width + 4

    }

    private static stopResize() {
        window.removeEventListener('mousemove', ResizeComponent.resize)
    }
}

export default ResizeComponent;
