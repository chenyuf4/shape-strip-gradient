export const vertexShader = `
varying vec2 v_Uv;
varying vec2 v_position;
void main() {
    v_Uv = uv;
    v_position = position.xy;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`;
