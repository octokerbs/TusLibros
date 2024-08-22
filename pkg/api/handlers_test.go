package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/KerbsOD/TusLibros/internal/tus_libros"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"net/http"
	"net/http/httptest"
	"testing"
)

type HandlersTestSuite struct {
	suite.Suite
}

func TestHandlersTestSuite(t *testing.T) {
	suite.Run(t, new(HandlersTestSuite))
}

func (s *HandlersTestSuite) Test01CanNotCreateCartWithEmptyName() {
	createCartRequest := CartRequest{
		ClientID: "",
		Password: "Kerbs",
	}
	body, _ := json.Marshal(createCartRequest)

	req := httptest.NewRequest(http.MethodPost, "/CreateCart", bytes.NewReader(body))
	w := httptest.NewRecorder()
	CreateCart(w, req)

	assert.Equal(s.T(), http.StatusBadRequest, w.Code)
	assert.Contains(s.T(), w.Body.String(), "1 | ClientID and Password are required")
}

func (s *HandlersTestSuite) Test02CanNotCreateCartWithEmptyPassword() {
	createCartRequest := CartRequest{
		ClientID: "Octo",
		Password: "",
	}
	body, _ := json.Marshal(createCartRequest)

	req := httptest.NewRequest(http.MethodPost, "/CreateCart", bytes.NewReader(body))
	w := httptest.NewRecorder()
	CreateCart(w, req)

	assert.Equal(s.T(), http.StatusBadRequest, w.Code)
	assert.Contains(s.T(), w.Body.String(), "1 | ClientID and Password are required")
}

func (s *HandlersTestSuite) Test03CanCreateCartWithValidUser() {
	createCartRequest := CartRequest{
		ClientID: "Octo",
		Password: "Kerbs",
	}
	body, _ := json.Marshal(createCartRequest)

	req := httptest.NewRequest(http.MethodPost, "/CreateCart", bytes.NewReader(body))
	w := httptest.NewRecorder()
	CreateCart(w, req)

	assert.Equal(s.T(), http.StatusOK, w.Code)
	assert.Contains(s.T(), w.Body.String(), "0 | 1")
}

func (s *HandlersTestSuite) Test04CanNotCreateCartWithUnknownClient() {
	createCartRequest := CartRequest{
		ClientID: "Norberto",
		Password: "Lining",
	}
	body, _ := json.Marshal(createCartRequest)

	req := httptest.NewRequest(http.MethodPost, "/CreateCart", bytes.NewReader(body))
	w := httptest.NewRecorder()
	CreateCart(w, req)

	assert.Equal(s.T(), http.StatusBadRequest, w.Code)
	assert.Contains(s.T(), w.Body.String(), fmt.Sprintf("1 | %s", tus_libros.InvalidUserOrPasswordErrorMessage))
}

func (s *HandlersTestSuite) Test05WeGetDifferentIDSWhenTwoClientsRequestANewCart() {
	createCartRequest1 := CartRequest{
		ClientID: "Octo",
		Password: "Kerbs",
	}
	body1, _ := json.Marshal(createCartRequest1)
	req1 := httptest.NewRequest(http.MethodPost, "/CreateCart", bytes.NewReader(body1))
	w1 := httptest.NewRecorder()
	CreateCart(w1, req1)

	createCartRequest2 := CartRequest{
		ClientID: "Luca",
		Password: "Zarecki",
	}
	body2, _ := json.Marshal(createCartRequest2)
	req2 := httptest.NewRequest(http.MethodPost, "/CreateCart", bytes.NewReader(body2))
	w2 := httptest.NewRecorder()
	CreateCart(w2, req2)

	assert.Equal(s.T(), http.StatusOK, w1.Code)
	assert.Contains(s.T(), w1.Body.String(), "0 | 1")

	assert.Equal(s.T(), http.StatusOK, w2.Code)
	assert.Contains(s.T(), w2.Body.String(), "0 | 2")
}
