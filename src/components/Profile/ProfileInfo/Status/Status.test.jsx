import React from "react";
import {create} from "react-test-renderer";
import Status from "./Status";

describe("ProfileStatus component", () => {
    test("status from component should be in the state", () => {
        const component = create(<Status userStatus="test status"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test status");
    });
    test("after create <span> should be displayed", () => {
        const component = create(<Status userStatus="test status"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after create <input> shouldn`t be displayed", () => {
        const component = create(<Status userStatus="test status"/>);
        const root = component.root;

        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("after create <span> should contains correct status", () => {
        const component = create(<Status userStatus="test status"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe('test status');
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<Status userStatus="test status"/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        expect(input.props.value).toBe('test status');
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<Status userStatus="test status" updateStatus = {mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});