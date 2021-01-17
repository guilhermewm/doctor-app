import { expect } from "chai";
import { loginValidator, registerValidator, validateInfo } from "../src/utils/validations";

describe("User Validators Register", () => {
    let body: any = {};
    before(async () => {
        body = {
            valid: {
                name: "Valid test",
                email: "valid@email.com",
                password: "validpassword"
            },
            invalid: {
                name: "inv",
                email: "invalid@email.commm",
                password: "invalid"
            }
        }
    });

    it("should be valid", () => {    
        const { error } = validateInfo(registerValidator, body.valid); 

        expect(error).to.be.undefined;
        expect(error).to.not.be.true;
    });

    it("should be invalid", () => {    
        const { error } = validateInfo(registerValidator, body.invalid); 
        
        expect(error).to.not.be.undefined;
        expect(error).to.be.string;
    });
});

describe("User Validators Login", () => {
    let body: any = {};
    before(async () => {
        body = {
            valid: {
                email: "valid@email.com",
                password: "validpassword"
            },
            invalid: {
                email: "invalid@email.commm",
                password: "invalid"
            }
        }
    });

    it("should be valid", () => {    
        const { error } = validateInfo(loginValidator, body.valid); 

        expect(error).to.be.undefined;
        expect(error).to.not.be.true;
    });

    it("should be invalid", () => {    
        const { error } = validateInfo(loginValidator, body.invalid); 
        
        expect(error).to.not.be.undefined;
        expect(error).to.be.string;
    });
});