export type Color = {
    r: number;
    g: number;
    b: number;
}
export type Camera = {
    x: number;
    y: number;
    zoom: number;
}
export enum LayerType {
    Rectangle,
    Elipse,
    Path,
    Text
}
export type RectangleLayer = {
    type: LayerType.Rectangle;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    stroke: Color;
    opacity: number;
    cornerRadius?: number;
}
export type ElipseLayer = {
    type: LayerType.Elipse;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    stroke: Color;
    opacity: number;

}
export type PathLayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Color;
    stroke: Color;
    opacity: number;
    points: number [][];
}
export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    height: number;
    width: number;
    text: string ,
    fontSize: number;
    fontWeight: number;
    fontFamily: string ;
    fill: Color;
    stroke: Color;
    opacity: number;

}
export type Layer = RectangleLayer | ElipseLayer | PathLayer | TextLayer;

export type Point = {
    
}