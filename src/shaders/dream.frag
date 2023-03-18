precision highp float;

varying vec3 vColor;

void main() {
    vec3 color = vec3(
        vColor.r * 1.0,
        vColor.g * 1.0,
        vColor.b * 1.0
    );
    gl_FragColor = vec4(color, 1.0);
}
