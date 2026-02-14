class Camera {

    constructor() {
        this.eye = new Vector3([0,5,0]);
        this.at = new Vector3([0,0,-100]);
        this.up = new Vector3([0,1,0]);

        this.viewMatrix = new Matrix4();
        this.getViewMatrix();
    }

    //#region movement

    moveForwardBackward(moveDir) {
        // calculate forward vector
        const forward = this.getForwardVector();
        forward.mul(moveDir);

        this.eye.add(forward);
        this.at.add(forward);
    }

    moveSide(moveDir) {
        // calculate side vector
        //const side = this.crossProduct(this.up, this.getForwardVector()).normalize();
        const side = Vector3.cross(this.up, this.getForwardVector());
        side.normalize();
        side.mul(moveDir);

        this.eye.add(side);
        this.at.add(side);
    }

    panHorizontal(panAmount) {
        const forward = this.getForwardVector();

        const rotMat = new Matrix4();
        rotMat.setRotate(panAmount, ...this.up.elements);

        const fPrime = rotMat.multiplyVector3(forward);

        this.at.set(fPrime);
        this.at.add(this.eye);
    }

    panVertical(panAmount) {
        const forward = this.getForwardVector();

        const rotMat = new Matrix4();
        const rotAxis = Vector3.cross(this.up, this.getForwardVector());
        rotMat.setRotate(panAmount, ...rotAxis.elements);

        const fPrime = rotMat.multiplyVector3(forward);

        this.at.set(fPrime);
        this.at.add(this.eye);
    }

    getViewMatrix() {
        this.viewMatrix.setLookAt(
            ...this.eye.elements,
            ...this.at.elements,
            ...this.up.elements
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

    //#endregion
}