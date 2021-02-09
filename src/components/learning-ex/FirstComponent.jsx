import React, { Component } from 'react'

export default class FirstComponent extends Component {
    render() {
        return (
            <div className="firstComponent">
                First Component
            </div>
        );
    }
}

export function SecondComponent() {
    // render() {
        return (
            <div className="secondComponent" >
                Second Component
            </div>
        );
    // }
}