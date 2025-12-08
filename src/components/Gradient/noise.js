// reference: https://github.com/Wasserwecken/glslLib/blob/master/lib/random.glsl
// reference: https://github.com/CedricGuillemet/Imogen/blob/ee417b42747ed5b46cb11b02ef0c3630000085b3/bin/Nodes/GLSL/AO.glsl#L14

// 暂时先用第一个reference里面的random函数，实在不行再用第二个里面的，第一个里面的应该更自然一点
export const noise = `
     vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
        return fract(sin(p)*43758.5453);
    }

    float noise(in vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        vec2 u = f*f*(3.0-2.0*f);

        float n = mix(mix(dot(-1.0+2.0*hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(-1.0+2.0*hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
        mix(dot(-1.0+2.0*hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(-1.0+2.0*hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
        return 0.5 + 0.5*n;
    }

    // 做出来颗粒状效果
    float filmGrainNoise(in vec2 uv) {
        return length(hash(vec2(uv.x, uv.y)));
    }
        
    
`;
