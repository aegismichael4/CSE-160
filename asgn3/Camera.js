class Camera {

    constructor(fov = 60, moveSpeed = 1) {
        this.fov = fov;
        this.moveSpeed = moveSpeed;

        this.eye = new Vector3([0,0,0]);
        this.at = new Vector3([0,0,-1]);
        this.up = new Vector3([0,1,0]);

        this.viewMatrix = new Matrix4();
        this.getViewMatrix();

        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(this.fov, canvas.width/canvas.height, 0.1, 1000);
    }

    //#region movement

    moveForwardBackward(moveDir) {
        // calculate forward vector
        const forward = this.getForwardVector();
        forward.mul(this.moveSpeed * moveDir);

        this.eye.add(forward);
        this.at.add(forward);
    }

    moveSide(moveDir) {
        // calculate side vector
        const side = this.crossProduct(this.up, this.getForwardVector()).normalize();
        side.mul(this.moveSpeed * moveDir);

        this.eye.add(side);
        this.at.add(side);
    }

    panSide(panAmount) {
        const forward = this.getForwardVector();

        const rotMat = new Matrix4();
        rotMat.rotate(panAmount, this.up.elements[0], this.up.elements[1], this.up.elements[2]);

        const fPrime = rotMat.multiplyVector3(forward);

        this.at.set(forward);
        this.at.add(this.eye);
    }

    getViewMatrix() {
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
        return this.viewMatrix;
    }

    //#endregion

    //#region helper functions

    getForwardVector() {
        const forward = new Vector3();
        forward.set(this.at);
        forward.sub(this.eye);
        forward.normalize();

        return forward;
    }

    crossProduct(a, b) {
        const result = new Vector3();
        result.elements[0] = a[1] * b[2] - a[2] * b[1];
        result.elements[1] = a[2] * b[0] - a[0] * b[2];
        result.elements[2] = a[0] * b[2] - a[1] * b[0];
        return result;
    }

    //#endregion
}