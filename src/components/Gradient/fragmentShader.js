import { noise } from "./noise";
export const fragmentShader = `
    varying vec2 v_Uv;
    varying vec2 v_position;
    uniform vec2 u_viewportSize;
    uniform vec3 u_colors[9];
    uniform float u_spacing;
    uniform float u_colorNoiseStrength;
    uniform float u_shapeSize;
    uniform float u_time;
    uniform float u_bounceSpeed;
    uniform float u_bounceOffset;
    uniform float u_bounceMagnitude;


     // add noise shader
    ${noise}

    float getBoundary(int index) {
        return u_shapeSize - float(index) * u_spacing + sin(u_time * u_bounceSpeed + float(index) * u_bounceOffset) * u_bounceMagnitude;
    }

    const int COLOR_COUNT = 9;
    void main() {
        vec2 position = v_Uv;
        position -= 0.5;
        position *= 2.0;  
        position.x *= min(1., u_viewportSize.x / u_viewportSize.y);
        position.y *= min(1., u_viewportSize.y / u_viewportSize.x);
        vec3 color = u_colors[8];
        float dist = length(position);
        float aa = fwidth(dist);

        
        // 呼吸式bounce
        float animatedBoundary = getBoundary(0);
        int index = 0;

        // 逐层检查哪一层覆盖当前像素
        for (int i = COLOR_COUNT - 1; i >= 0; i--) {
            if (dist <= getBoundary(i)) {
                index = i;
                animatedBoundary = getBoundary(i);
                break;
            }
        }
        float tOuter = smoothstep(animatedBoundary + aa, animatedBoundary, dist);
     
        color = mix(color, u_colors[index], tOuter);

        float colorNoise = filmGrainNoise(v_Uv);
        // u_colorNoiseStrength 会影响噪点的强度
        color += colorNoise * u_colorNoiseStrength;

        color = clamp(color, 0.0, 1.0);
        gl_FragColor = vec4(color, 1.0);
    }
`;
// 如何解决锯齿问题
// reference: https://people.freedesktop.org/~idr/OpenGL_tutorials/03-fragment-intro.html#circle-image
