precision highp float;

varying float dist;

void main() {
    float opacity = 1.0 - dist * 0.35;
    gl_FragColor = vec4(0.6, 0.8, 1.0, opacity);
}
