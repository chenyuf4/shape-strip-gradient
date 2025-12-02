// reference: https://github.com/Wasserwecken/glslLib/blob/master/lib/random.glsl
// reference: https://github.com/CedricGuillemet/Imogen/blob/ee417b42747ed5b46cb11b02ef0c3630000085b3/bin/Nodes/GLSL/AO.glsl#L14

// 暂时先用第一个reference里面的random函数，实在不行再用第二个里面的，第一个里面的应该更自然一点
export const noise = `
    const float WHITE_NOISE_SCALE = 5461.5461;

    vec2 hash_vec2_to_vec2(vec2 p) {
        p *= WHITE_NOISE_SCALE;
        vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
        p3 += dot(p3, p3.yzx+33.33);
        return fract((p3.xx+p3.yz)*p3.zy);
    }

    
    // returns 2D gradient noise (in .x) and its derivatives (in .yz)
    vec3 noise_2d( in vec2 x ) {
        vec2 i = floor( x );
        vec2 f = fract( x );

        vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
        vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);
        
        vec2 ga = hash_vec2_to_vec2( i + vec2(0.0,0.0) );
        vec2 gb = hash_vec2_to_vec2( i + vec2(1.0,0.0) );
        vec2 gc = hash_vec2_to_vec2( i + vec2(0.0,1.0) );
        vec2 gd = hash_vec2_to_vec2( i + vec2(1.0,1.0) );
        
        float va = dot( ga, f - vec2(0.0,0.0) );
        float vb = dot( gb, f - vec2(1.0,0.0) );
        float vc = dot( gc, f - vec2(0.0,1.0) );
        float vd = dot( gd, f - vec2(1.0,1.0) );

        return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                    ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                    du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
    }
        
    
`;
