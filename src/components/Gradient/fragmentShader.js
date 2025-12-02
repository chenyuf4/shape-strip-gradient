import { noise } from "./noise";
export const fragmentShader = `
    varying vec2 v_Uv;
    varying vec2 v_position;
    uniform vec2 u_viewportSize;
    uniform vec3 u_colors[9];
    uniform float u_spacing;
    uniform float u_colorNoiseSize;
    uniform float u_colorNoiseStrength;
    uniform float u_shapeSize;


     // add noise shader
    ${noise}

    const int COLOR_COUNT = 9;
    void main() {
        vec2 position = v_Uv;
        position -= 0.5;
        position *= 2.0;
        position.x *= min(1., u_viewportSize.x / u_viewportSize.y);
        position.y *= min(1., u_viewportSize.y / u_viewportSize.x);
        vec3 color = u_colors[6];
        float dist = length(position);
        float aa = fwidth(dist);

        int index = int(clamp(floor((u_shapeSize - dist) / u_spacing), 0.0, float(COLOR_COUNT - 1)));
        float outer = u_shapeSize - float(index) * u_spacing;
        float tOuter = smoothstep(outer + aa, outer, dist);
     
        color = mix(color, u_colors[index], tOuter);

        float colorNoise = noise_2d(v_position * u_viewportSize * u_colorNoiseSize).x;
        // u_colorNoiseStrength 会影响噪点的强度
        color += colorNoise * u_colorNoiseStrength;

        color = clamp(color, 0.0, 1.0);
        gl_FragColor = vec4(color, 1.0);
    }
`;
// 如何解决锯齿问题
// reference: https://people.freedesktop.org/~idr/OpenGL_tutorials/03-fragment-intro.html#circle-image
