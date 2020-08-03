import '../../stencil.core';
export declare class LoadingContentTag {
    state: string;
    progress: number;
    visible: boolean;
    current: number;
    total: number;
    containerWidth: number;
    containerHeight: number;
    /**
     * LoadingContentTag events
     *
     * Listens events:
     *  CONTENT_STATUS
     *
     */
    /**
     * Lifecycle method that is called once when the component is fully loaded
     * and the first render() occurs.
     *
     * Adds an event listener for 'CONTENT_STATUS' and passes changeState as a Callback
     */
    componentDidLoad(): void;
    /**
     * Changes state according to the event presented
     */
    changeState: (event: any) => void;
    render(): JSX.Element;
}
