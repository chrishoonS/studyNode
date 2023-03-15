const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const MemberModel = sequelize.define('tb_member', {
        pk_member: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: nextval('seq_tb_member_pk::regclass'),
            comment: "사용자 PK",
            primaryKey: true
        },
        fd_member_code: {
            type: DataTypes.CHAR(16),
            allowNull: false,
            comment: "사용자 코드"
        },
        fd_member_id: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "사용자 id"
        },
        fd_member_mobile: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "휴대전화 번호"
        },
        fd_member_pw: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "사용자 pw"
        },
        fd_member_email: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "사용자 email"
        },
        fd_member_nickname: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "닉네임"
        },
        fd_member_state_code: {
            type: DataTypes.CHAR(6),
            allowNull: false,
            comment: "사용자 상태"
        },
        fd_signup_type_code: {
            type: DataTypes.CHAR(6),
            allowNull: false,
            comment: "사용자 가입 구분 코드"
        },
        fd_auth_token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "인증토큰"
        },
        fd_push_token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "푸쉬토큰"
        },
        fd_temp_token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "1회용 인증용 토큰"
        },
        fd_apple_token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "애플 인증 토큰"
        },
        fd_push_token_os_code: {
            type: DataTypes.CHAR(6),
            allowNull: true,
            comment: "푸쉬토큰 발행OS 구분코드"
        },
        fd_login_fail_cnt: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: 0,
            comment: "로그인 실패 횟수"
        },
        fk_partner: {
            type: DataTypes.BIGINT,
            allowNull: true,
            comment: "기관 정보 fk"
        },
        fk_service: {
            type: DataTypes.BIGINT,
            allowNull: true,
            comment: "서비스 fk"
        },
        fd_join_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.Sequelize.fn('now'),
            comment: "사용자 가입일자"
        }
    }, {
        sequelize,
        tableName: 'tb_member',
        schema: 'breeseed',
        timestamps: false,
        indexes: [
            {
                name: "xpk_member",
                unique: true,
                fields: [
                    { name: "pk_member" },
                ]
            },
        ]
    });

    return MemberModel;
};
